// Test cases are done through Jest, Chai assertion API
// Notes:
// Status code 200 = Success
// Status code 401 = Fail

// Getting user by id
// If user exists, it returns with status code 200
pm.test("Valid user id", function () {
    pm.response.to.have.status(200);
});

// Valid user account
// if user exists with the given email, it returns with status code 200
pm.test("Valid user account", function () {
    pm.response.to.have.status(200);
});

// Invalid user account
// if user doesnt exists, it return with status code 401 while controlling the failing status, as we are
// intentionally checking the invalid user
pm.test("Invalid user profile", function () {
    pm.response.to.have.status(401);
});

// Getting all user accounts
// If API call is successful, it return with status code 200
pm.test("Getting all users successfull", function () {
    pm.response.to.have.status(200);
});

// Successfull login
// If login is passed with correct parameters, then it return with status code 200
pm.test("Successful login", function () {
    pm.response.to.have.status(200);
});

// Invalid login
// if login is called with invalid credentials, then it returns with status code 401
pm.test("Invalid login", function () {
    pm.response.to.have.status(401);
});

// Response time of fetching login API call has to be less than 300ms
pm.test("Response time less than 3000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(300);
})

// Entered password should match current password
// If successfull, it returns with status code 200
pm.test("Password should match", function () {
    pm.response.to.have.status(200);
});

// User registration is successfull
// If there is not existing user with similar information, then it return with status code 200
pm.test("Register successfull", function () {
    pm.response.to.have.status(200);
});

// User registration failed successfully
// If there is a user with existing information, then it returns with status code 400
pm.test("Registration failed successfully", function () {
    pm.response.to.have.status(400);
});

// Update password
// If old password is correct, then it updates the password and return with status code 200
pm.test("Password update successfull", function () {
    pm.response.to.have.status(200);
});
 
// Adding skill
pm.test("Skill addition successfull", function () {
    pm.response.to.have.status(200);
});

// Deleting a skill
pm.test("Delete skill successfull", function () {
    pm.response.to.have.status(200);
});

// Updating user information
// If the user enters the correct email and password for verification, then it return with status code 200
pm.test("Updating user successfull", function () {
    pm.response.to.have.status(200);
});

// Update user profile
// It changes user's name and email, if successfull it return with status code 200
pm.test("Updating profile successfull", function () {
    pm.response.to.have.status(200);
});

// Adding experience
// If user exists and a new experience is added successfully, then it return with status code 200
pm.test("Experience added successfull", function () {
    pm.response.to.have.status(200);
});

// Deleting experience
// if user exists and try to delete an experience, if successful, then it returns wtih status code 200
pm.test("Experience deleted successfull", function () {
    pm.response.to.have.status(200);
});

// Adding education
// If user calls the API with correct parameters, such as school and degree, and the result is successfull, then it 
// return with status code 200
pm.test("Education added successfull", function () {
    pm.response.to.have.status(200);
});

// Adding langauge
// If a language was added successfully in a user's account, then it returns with status code 200
pm.test("Language added successfull", function () {
    pm.response.to.have.status(200);
});

// Deleting language
// If a language exists in the user's account and tries to delete it, and if successful, then it returns with status code 200
pm.test("Language deleted successfull", function () {
    pm.response.to.have.status(200);
});

// Adding a new project
// It adds a new project in user's account, and returns with status code 200 
pm.test("Project added successfull", function () {
    pm.response.to.have.status(200);
});

// Deleting a project
// It removes a project with given name form user's account, and returns with status code 200
pm.test("Project deleted successfull", function () {
    pm.response.to.have.status(200);
});