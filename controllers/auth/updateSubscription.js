const {User} = require("../../models/user");

// Update subscription
const updateSubscription = async (req, res) => {
    const {_id} = req.user;
    const  {subscription} = req.body;
    await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json ({
        subscription,
    })
}

module.exports = updateSubscription;