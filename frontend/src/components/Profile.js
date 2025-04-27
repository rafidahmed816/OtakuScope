import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "../styles/Profile.css";

const Profile = () => {
  // Fetch username from localStorage directly
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTab, setEditingTab] = useState("profileEditing");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "/AnimeGirl.png");
  const [banner, setBanner] = useState(localStorage.getItem("banner") || "/AnimeBanner.jpg");
  const navigate = useNavigate(); // Added for navigation functionality if needed


  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername.trim() !== "") {
      setUsername(storedUsername);
    } else {
      navigate("/login"); // If username is not in localstorage or is an empty string, jsut redirect to Login Page
    }
  }, [navigate]);

return (
    <div className="profileContainer">

      {/* Avatar & Banner Section */}
      <div className="profileHeader">
        {/* Banner with Background & Controls */}
        <div
           className="banner"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width:1750,
            height:400,
          }}
        >
          {/* LOGOUT Button */}
          <button onClick={handleLogout} className="logoutButton">
         Logout
          </button>

        </div>

        {/* Avatar Container (positioned separately, typically overlapping the banner) */}
        <div className="avatarContainer">
          {avatar.endsWith(".mp4") ? (
            <video
              src={avatar}
               className="avatarVideo"
              width="123px"
              height="123px"
              autoPlay
              loop
              muted
            />
          ) : (
            <img src={avatar} alt="Avatar"  className="avatar" />
          )}

          {/* Hidden Upload Inputs */}
          <input
            type="file"
             className="hiddenFileInput"
            id="avatar-upload"
            accept="image/*"
            onClick={(e) => (e.target.value = null)}
            onChange={handleAvatarChange}
          />
          <input
            type="file"
             className="hiddenFileInput"
            id="banner-upload"
            accept="image/*"
            onChange={handleBannerChange}
          />
        </div>

        {/* Welcome, Profile Editing & Removal Buttons */}
          <div  className="profileButtonsContainer">
          <div className="welcomeMessage">
            <h2 className="username">
              Welcome <span className="usernameHighLight1">{username}</span> 
            </h2>
          </div>

          {/* Banner Buttons Container */}
          <div className="profileTabShadow">

            {/* Removal Buttons */}
            <div className="removeButtonGroup">
            <img src="/RemvAvatar.png" alt="Remove Avatar" onClick={handleRemoveAvatar}  className="removeIcon1" />
              <button onClick={handleRemoveAvatar} className="upAvatarBtn">Remove Avatar</button>
              </div>
              <div  className="removeButtonGroup bannerGroup">

                <button onClick={handleRemoveBanner} className="upBannerBtn">Remove Banner</button>
            <img src="/RemvBanner.png" alt="Remove Banner" onClick={handleRemoveAvatar}  className="removeIcon2" />
              </div>

            {/* Profile Editing Section */}
            <div className="editProfileGroup">
              <img src="/ProfileEdit.png" alt="Edit Profile"  className="editProfileIcon"  onClick={() => openEditingTab("profileEditing")} />
              <button onClick={() => openEditingTab("profileEditing")} className="editProfile">Edit Profile</button>
            </div>

            </div>


          </div>


        {isEditing && (
          <div className="editingOverlay">
            <div className={editingTab === "profileEditing" ? "editingTab" : "storesTab"}>
              <button className={editingTab === "profileEditing" ? "closeButtonProfileEdit" : "closeButtonStores"} onClick={closeEditingTab}>✖</button>

              {editingTab === "profileEditing" && (
                <div>
                  <h3 className="ProfileEditing">Profile Editing</h3>
                  <label htmlFor="avatar-upload" className="upAvatarBtn">Upload Avatar</label>
                  <label htmlFor="banner-upload" className="upAvatarBtn">Upload Banner</label>
                  <br></br> <br></br>
                  <button onClick={() => openEditingTab("storeAvatar")} className="storeButtonAvt">
                   Avatar Store 
                  </button>
                  <button onClick={() => openEditingTab("storeBanner")} className="storeButtonBnr">
                   Banner Store
                  </button>
                </div>
              )}

              {editingTab === "storeAvatar" && (
                <div>
                  <h3 className="ProfileEditing">Avatar Store</h3>
                  <button onClick={() => openEditingTab("profileEditing")} className="backeditBtn">
                    Back to Editing
                  </button>

                  {/* Scrollable store list */}
                  <div className="storeGrid" style={{ overflowY: "auto", maxHeight: "300px" }}>
                    {storeAvatars.map((avatarOption, index) => (
                      <div
                        key={index}
                        onClick={() => handleStoreAvatarSelect(avatarOption)} // Updates avatar instantly
                        className="dropdownItem"
                      >
                        {avatarOption.endsWith(".mp4") ? (
                          <video
                            width="80px"
                            height="80px"
                            autoPlay
                            loop
                            muted
                            src={avatarOption} // Preloaded for instant switching
                          />
                        ) : (
                          <img
                            src={avatarOption}
                            alt={avatarOption.split("/").pop()}
                            style={{ width: "80px", height: "80px", borderRadius: "3px" }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {editingTab === "storeBanner" && (
                <div>
                  <h3 className="ProfileEditing">Banner Store</h3>
                  <button onClick={() => openEditingTab("profileEditing")} className="backeditBtn">
                    Back to Editing
                  </button>

                  {/* Scrollable store list */}
                  <div className="storeGridBanner" style={{ overflowY: "auto", maxHeight: "300px" }}>
                    {storeBanners.map((bannerOption, index) => (
                      <div
                        key={index}
                        onClick={() => handleStoreBannerSelect(bannerOption)} // Updates banner instantly
                        className="dropdownItem"
                      >
                        <img
                          src={bannerOption}
                          alt={bannerOption.split("/").pop()}
                          style={{ width: "390px", height: "90px", borderRadius: "1px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      <hr className="bar"></hr>

      {/* Profile Options Bar */}
      <div className="profileNav">
        {[
          "Overview",
          "Anime List",
          "Manga List",
          "Favourites",
          "Stats",
          "Social",
          "Reviews",
          "Submissions",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={activeTab === tab ? "navButton activeTab" : "navButton"}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Display */}
      <div className="profileContent">
        {activeTab === "Overview" && (
          <div className="overview">
            <div className="animeColumn">Anime interactions go here...</div>
            <div className="actionsColumn">Action log goes here...</div>
          </div>
        )}
      </div>
    </div>
  );

};



export default Profile;