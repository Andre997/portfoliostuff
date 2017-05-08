var bob = document.getElementById("myCanvas"); 
if (bob && bob.getContext) {
    var pcd = bob.getContext("2d"); 
 
    if (pcd) {} 
        
        //tree
         pcd.beginPath();
         pcd.fillStyle = "brown";
         pcd.fillRect(500,140,30,80);
         pcd.fill ();
         pcd.closePath();
        
        //hill right
         pcd.beginPath();                                          
         pcd.arc(510,600,400,0,2*Math.PI); 
         pcd.fillStyle = "green";          
         pcd.fill();                       
         pcd.closePath();                    
        
        //hill left
         pcd.beginPath();
         pcd.arc(0,600,400,0,2*Math.PI);
         pcd.fillStyle = "green";
         pcd.fill ();
         pcd.closePath ();
        
        
        //house
         pcd.beginPath();
         pcd.fillStyle = "Red";
         pcd.fillRect(60,190,200,200);
         pcd.strokeRect(60,190,200,200);
         pcd.fill ();
         pcd.closePath();