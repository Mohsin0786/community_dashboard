const User = require('../models/User');
const Message = require('../models/Message');

exports.getSummary = async (req, res) => {

  try {
    const totalMembers = await User.countDocuments();
    const totalMessages = await Message.countDocuments();
    res.status(200).json({ totalMembers, totalMessages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary metrics' });
  }
}

exports.getMembers = async (req, res) => {

  try {
    const activeThreshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeMembersCount = await User.countDocuments({ lastActive: { $gte: activeThreshold } });
    const inactiveMembersCount = await User.countDocuments({ lastActive: { $lte: activeThreshold } });
    res.status(200).json({ activeMembersCount, inactiveMembersCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member metrics' });
  }

}


exports.getTopContributors = async (req, res) => {

  try {
    const topContributors = await User.find({}, { username: 1, messageCount: 1, _id: 0 }).sort({ messageCount: -1 }).limit(5);
    res.status(200).json({ topContributors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top contributors' });
  }

}

exports.getGrowthRate = async (req, res) => {

  try {
    const growthRate = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$joinDate" },
            month: { $month: "$joinDate" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $project: {
          _id: 0,
          date: {
            $concat: [
              { $toString: "$_id.year" }, "-",
              { $toString: { $substr: [{ $add: ["$_id.month", 100] }, 1, 2] } }, "-",
              {
                $cond: [
                  { $eq: [{ $mod: ["$_id.month", 2] }, 0] },
                  "30",  // Even months get 30th
                  "29"   // Odd months get 29th
                ]
              }
            ]
          },
          newMembers: "$count"
        }
      }
      
    ]);

    let totalMembers = 0;
    const data = growthRate.reduce((acc, item) => {
      totalMembers += item.newMembers;
      acc.push({ ...item, totalMembers });
      return acc;
    }, []);

    res.status(200).json({ growthRate: data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching growth rate' });
  }
}


exports.getEngagementRate = async (req, res) => {

  try {
  
    const engagementRate = await Message.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            week: { $week: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d", // Format the date as "YYYY-MM-DD"
              date: {
                $dateFromParts: {
                  isoWeekYear: "$_id.year",
                  isoWeek: "$_id.week",
                  isoDayOfWeek: 1 // Set to 1 for the start of the week (Monday)
                }
              }
            }
          },
          messages: "$count"
        }
      }
    ]);
    
    res.status(200).json({ engagementRate });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching engagement rate' });
  }
}


