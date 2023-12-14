import { EventEmitter } from 'node:events';
import { PrismaClient } from '@prisma/client'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var PROTO_PATH = __dirname + '/../../proto/student.proto';
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).student;
var client = new hello_proto.StudentService("localhost:50051",grpc.credentials.createInsecure());


const prisma = new PrismaClient()
const event = new EventEmitter();
export const resolvers=  {
    Query:{
        getAllStudents:async () => {
            const allStudents = await prisma.student.findMany();
            return allStudents;
        },
        getStudent:async (parent,args) => {
            const id = parseInt(args.rollNo);
            const query = { rollNo: id };
            const student = await prisma.student.findUnique({
                where: query,
            });
            if (!student) {
                return `No student with id ${id}`;
            }
            return student;
        },
        getMaleStudents:async () => {
            const maleStudents = await prisma.student.findMany({
                where:{gender: 'Male'}
            });
            return maleStudents;
        },
    },
    Mutation:{
        createStudent:async (parent, args) => {
            event.emit('createStudent', args);
        },
        updateStudent:async (parent, args) => {
            event.emit('updateStudent', args);
        },
        deleteStudent:async (parent, args) => {
            event.emit('deleteStudent', args);
        },
    }
}
//EVENTS 


event.on('createStudent', async (args) => {
    client.addStudent(args, function(err, response) {
        console.log('Student created :-\n', response);
      });
});

event.on('updateStudent', async (args) => {
    client.updateStudent(args, function(err, response) {
        console.log('Student updated :-\n', response);
      });
});

event.on('deleteStudent', async (args) => {
    client.deleteStudent(args, function(err, response) {
        console.log('Student deleted\n', response);
      });
});
