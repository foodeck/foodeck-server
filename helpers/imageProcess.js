let imageToLabels = async function (req, client){
    var final_res = [];
    for (var i = 0; i < req.files.length; i++) {
        const [result] = await client.labelDetection(req.files[i].buffer);
        var label_final = [];
        for (var j = 0; j < result.labelAnnotations.length; j++) {
            const labels = result.labelAnnotations[j].description;
            const score = result.labelAnnotations[j].score;
            const temp = { 'description': labels, 'score': score };
            label_final.push(temp);
        }
        final_res = final_res.concat(label_final);
    }
    var return_res = { "result": final_res };
    return (return_res);
}

exports.imageToLabels = imageToLabels;