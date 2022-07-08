let directory=malloc(256,1);
p.writestr(directory.add32(0),"/");
let retopen=await chain.syscall(5,directory,0,0);
let directoryBuffer=malloc(1024*1024,1);
let directorySize=1024*1024;
let retgetdent=await chain.syscall(272,retopen,directoryBuffer,directorySize);
let numbytes=parseInt(retgetdent,16);
let entry;
let num_entry=0; 
let d_fileno;
let d_reclen;
let d_type;
let d_namelen;
let d_name;
let position=0;
for(position=0;position<numbytes;){ 
  entry=directoryBuffer.add32(position); 
  d_fileno=p.read4(entry.add32(0));   
  d_reclen=p.read2(entry.add32(4)); 
  d_type=p.read1(entry.add32(6));   
  d_namelen=p.read1(entry.add32(7)); 
  d_name=p.readstr(entry.add32(8));
  alert("num_entry=${num_entry} d_reclen=${d_reclen} d_type=${d_type} d_namelen=${d_namelen} d_name=${d_name} position=${position}");
   position=position+d_reclen;
   parseInt(position)+parseInt(d_reclen,16); 
   num_entry++; 
}