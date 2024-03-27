Webcam.set({
    height: 350,
    width: 350,
    image_format : 'png',
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';
    });
  
};
console.log("ml5 version: " , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4_WklgaqVr/model.json',modelLoaded);
function modelLoaded() {
    console.log("modelLoaded");
}
function identify_img(){
    img = document.getElementById("captured_img");
    classifier.classify(img , gotResult)
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("family_member_name").innerHTML = results[0].label;
        document.getElementById("accuracy_member").innerHTML = results[0].confidence.toFixed(2);
    }
}