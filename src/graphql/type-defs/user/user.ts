const userTypeDef = `
  type User {
    id:            ID!
    firstName:     String!
    lastName:      String!
    email:         String!
    setUpComplete: Boolean!
    role:          String!
  
    weight:       Float
    height:       Float
    bodyFat:      Float
    userActivity: String
    sex:          String
  
    dateOfBirth:     String
    timezone:        String
    preferredTheme:  String
    preferredMetric: String
    googleId:        String
    displayName:     String
  
    createdAt: String!
    updatedAt: String
  }
`;

export default userTypeDef;
