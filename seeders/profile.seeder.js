const Profile = require("./../models/profile.model");
const User = require("./../models/user.model");

// sample data
const profiles = async (users) => [
  {
    userId: users.find((user) => user.username === "adminUser"),
    name: {
      firstName: "John",
      lastName: "Doe",
      middleName: "Michael",
      initials: "J.M.D",
      displayName: "John Doe",
    },
    bio: "Founder of Intelligent Tour Hub",
    contactDetails: {
      phone: "+1 234 567 890",
      email: "john.doe@example.com",
      website: "https://www.johndoe.com",
    },
    permamentAddress: {
      address: "123 Main St",
      city: "Colombo",
      province: "Western",
      postalCode: "12345",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [79.8612, 6.9271],
      },
    },
    currentAddress: {
      address: "456 Another St",
      city: "Kandy",
      province: "Central",
      postalCode: "54321",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.635, 7.2906],
      },
    },
    isActive: true,
    isPublic: true,
  },
  {
    userId: users.find((user) => user.username === "salesUser"),
    name: {
      firstName: "Jane",
      lastName: "Smith",
      initials: "J.S",
      displayName: "Jane Smith",
    },
    bio: "Marketing expert with a passion for travel and tourism.",
    contactDetails: {
      phone: "+1 987 654 321",
      email: "jane.smith@example.com",
    },
    permamentAddress: {
      address: "789 Some Ave",
      city: "Galle",
      province: "Southern",
      postalCode: "67890",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.217, 6.033],
      },
    },
    currentAddress: {
      address: "101 Different St",
      city: "Matara",
      province: "Southern",
      postalCode: "09876",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.536, 5.945],
      },
    },
    isActive: true,
    isPublic: false,
  },
  {
    userId: users.find((user) => user.username === "managerUser"),
    name: {
      firstName: "Emily",
      lastName: "Jones",
      middleName: "Rose",
      initials: "E.R.J",
      displayName: "Emily Jones",
    },
    bio: "Travel consultant and avid photographer.",
    contactDetails: {
      phone: "+44 123 456 789",
      email: "emily.jones@example.com",
      website: "https://www.emilyjones.com",
    },
    permamentAddress: {
      address: "202 Old Lane",
      city: "Anuradhapura",
      province: "North Central",
      postalCode: "22456",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.3884, 8.3114],
      },
    },
    currentAddress: {
      address: "303 New Road",
      city: "Polonnaruwa",
      province: "North Central",
      postalCode: "33445",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [81.0023, 7.9384],
      },
    },
    isActive: true,
    isPublic: true,
  },
  {
    userId: users.find((user) => user.username === "customerUser"),
    name: {
      firstName: "David",
      lastName: "Brown",
      initials: "D.B",
      displayName: "David Brown",
    },
    bio: "Experienced in organizing eco-friendly tours.",
    contactDetails: {
      phone: "+61 987 654 321",
      email: "david.brown@example.com",
      website: "https://www.davidbrown.com",
    },
    permamentAddress: {
      address: "404 Hill St",
      city: "Nuwara Eliya",
      province: "Central",
      postalCode: "77889",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.773, 6.9497],
      },
    },
    currentAddress: {
      address: "505 Valley Rd",
      city: "Ella",
      province: "Uva",
      postalCode: "99887",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [81.0463, 6.8716],
      },
    },
    isActive: true,
    isPublic: false,
  },
  {
    userId: users.find((user) => user.username === "tourGuideUser"),
    name: {
      firstName: "Sarah",
      lastName: "Lee",
      middleName: "Ann",
      initials: "S.A.L",
      displayName: "Sarah Lee",
    },
    bio: "Tour guide specializing in cultural and historical tours.",
    contactDetails: {
      phone: "+49 123 456 789",
      email: "sarah.lee@example.com",
      website: "https://www.sarahlee.com",
    },
    permamentAddress: {
      address: "606 Lake View",
      city: "Trincomalee",
      province: "Eastern",
      postalCode: "66778",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [81.2316, 8.5874],
      },
    },
    currentAddress: {
      address: "707 Beach Blvd",
      city: "Batticaloa",
      province: "Eastern",
      postalCode: "77665",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [81.6858, 7.7309],
      },
    },
    isActive: true,
    isPublic: true,
  },
];

// seed data
const seedProfiles = async () => {
  // delete existing
  await Profile.deleteMany({});

  // get users
  const users = await User.find();

  // build data with references
  const profilesWithReferences = await profiles(users);

  // insert new
  await Profile.insertMany(profilesWithReferences);
};

module.exports = seedProfiles;
