export const typeDefs = `
    type Student {
        rollNo: ID!
        name: String!
        CNIC: Int!
        isActiveStudent: Boolean!
        gender: Gender!
    }

    enum Gender {
        Male
        Female
        NotSpecified
      }

    type Query {
        getAllStudents: [Student]
        getStudent(rollNo: ID!): Student
        getMaleStudents: [Student]
    } 

    type Mutation {
        createStudent(name: String!, CNIC:String!, isActiveStudent: Boolean!,gender: Gender!): Student
        updateStudent(rollNo: ID!,name: String!, CNIC:Int!, isActiveStudent: Boolean!,gender: Gender!): Student
        deleteStudent(rollNo: ID!): Student
    }
`;