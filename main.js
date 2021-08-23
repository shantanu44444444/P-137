objects = [];
video = "";
status = "";
object_name = "";

function setup(){
    canvas = createCanvas(500 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video , 0 , 0 , 500 , 400 );

    if(status != ""){
        objectDetector.detect(video , gotResults);

        for(i = 0; i < objects.length; i++){

            if (objects[i].label == object_name) {
                
                document.getElementById("status").innerHTML = " Status : Object " + " " + object_name + " " + " found ";
            }

            else{
                document.getElementById("status").innerHTML = " Status : Object not Found ";
            }

            document.getElementById("number_of_objects").innerHTML = " Number of Objects are : " + objects.length;

            fill("#eb4034");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y +15);
            noFill();
            stroke("#eb4034");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height );
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects ";
    document.getElementById("head").value;
}

function modelLoaded(){
    console.log(" My Model Has Loaded !! ");
    status = true;

}


function gotResults( error , results ){
    if (error) {
        console.log(error);
    }

    console.log(results);
    objects = results;
}