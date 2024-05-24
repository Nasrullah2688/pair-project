const { User, UserProfile } = require('../models')

class UserController {

    static async renderHomeBio(req, res) {
        try {
            const userProfiles = await UserProfile.findAll({
                include: {
                    model: User,
                    attributes: ['name']
                }
            });
            res.render('Bio/homeBio', { userProfiles });
        } catch (error) {
            ren.send(error)
        }
    }

    static async renderCreateForm(req, res) {
        try {
            const users = await User.findAll();
            res.render('Bio/createUserProfile', { users });
        } catch (error) {
            res.send(error)
        }
    }

    // Handle create user profile
    static async createUserProfile(req, res) {
        try {
            const { bio, photo, userId } = req.body;
            await UserProfile.create({ bio, photo, UserId: userId });
            res.redirect('/homeBio'); // Sesuaikan dengan route yang Anda inginkan
        } catch (error) {
            res.send(error)
        }
    }

    // Render form edit user profile
    static async renderEditForm(req, res) {
        try {
            const userProfileId = req.params.id;
            const userProfile = await UserProfile.findByPk(userProfileId);
            const users = await User.findAll();

            res.render('Bio/editUserProfile', { userProfile, users })
        } catch (error) {
            res.render(error)
        }
    }

    // Handle edit user profile
    static async editUserProfile(req, res) {
        try {
            const userProfileId = req.params.id;
            const { bio, photo, userId } = req.body;
            const userProfile = await UserProfile.findByPk(userProfileId);
            await userProfile.update({ bio, photo, UserId: userId });
            res.redirect('/homeBio')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController;
