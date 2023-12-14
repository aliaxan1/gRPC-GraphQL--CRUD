import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var PROTO_PATH = __dirname + '/../proto/student.proto';


import { PrismaClient } from '@prisma/client';
import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { response } from 'express';
var packageDefinition = loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = loadPackageDefinition(packageDefinition).student;
const prisma = new PrismaClient();


const addStudent = async (args,callback) => {
  const cnic = Number(args.request.CNIC);
  await prisma.student.create({
      data: { 
          name: args.request.name,
          CNIC: cnic,
          gender: args.request.gender,
          isActiveStudent: args.request.isActiveStudent
      },
  }).then((res) => {
    console.log(res);
    callback(null, res);
  });
}
const updateStudent = async (args,callback) => {
  const cnic = Number(args.request.CNIC);

  await prisma.student.update({
      where: {
          rollNo: parseInt(args.request.rollNo),
      },
      data: {
          name: args.request.name,
          CNIC: cnic,
          gender: args.request.gender,
          isActiveStudent: args.request.isActiveStudent
      },
  }).then((res) => {
    console.log(res);
    callback(null, res);
  });
}

const deleteStudent = async (args,callback) => {
  try {
    await prisma.student.delete({
      where: {
          rollNo: parseInt(args.request.rollNo),
      },
  }).then((res) => {
    console.log(res);
    callback(null, res);
  });
  } catch (error) {
    console.log(error);
    callback(error,null);
  }
};



function main() {
  var server = new Server();
  server.addService(hello_proto.StudentService.service,{addStudent: addStudent, updateStudent: updateStudent, deleteStudent: deleteStudent});
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at http://localhost:50051');
  });
}

main();
