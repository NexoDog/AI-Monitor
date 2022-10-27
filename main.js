status = "";
objects = [];
results = [];
synth = "";

function setup()
{
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
}

function draw()
{
    image(video,0,0,300,300);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
  
        objectDetector.detect(video,gotResult);

    for( i = 0; i< objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" ,  objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            

            if(objects[i].label == person)
            {
               video.stop();
               document.getElementById("object_status").innerHTML = "Person Found"; 
               objectDetector.detect(gotResult);
               synth = window.speechSynthesis;
               utterThis = new SpeechSynthesisUtterance("Person Found");
               synth.speak(utterThis);

            }
            else
            {
                document.getElementById("object_status").innerHTML = "Not Detected";
            }
        }
    }

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting";

}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    if(results)
    {
        console.log(results);
        objects = results;  
    }
}