<form className="profile-form">
  <label htmlFor="username">Username:</label>
  <input
    type="text"
    id="username"
    name="username"
    value={booking.fullName}
    onChange={(e) => setUsername(e.target.value)}
    disabled={!isEditMode}
  />

  <label htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    disabled={!isEditMode}
  />

  {user.username === "hotel" && (
    <>
      <label htmlFor="hotelName">Hotel Name:</label>
      <input
        type="text"
        id="hotelName"
        name="hotelName"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
        disabled={!isEditMode}
      />

      <label htmlFor="hotelLocation">Hotel Location:</label>
      <input
        type="text"
        id="hotelLocation"
        name="hotelLocation"
        value={hotelLocation}
        onChange={(e) => setHotelLocation(e.target.value)}
        disabled={!isEditMode}
      />
    </>
  )}

  {isEditMode ? (
    <button type="button" onClick={() => handleSaveClick(user._id)}>
      Save
    </button>
  ) : (
    <button type="button" onClick={handleEditClick}>
      Edit
    </button>
  )}
</form>;
