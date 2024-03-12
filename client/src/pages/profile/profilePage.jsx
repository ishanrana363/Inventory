import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import Profile from "../../components/profile/userProfile.jsx";

const ProfilePage = () => {
    return (
        <div>
            <Layout>
                <Profile/>
            </Layout>
        </div>
    );
};

export default ProfilePage;