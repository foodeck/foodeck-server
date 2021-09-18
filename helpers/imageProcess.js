let imageToLabels = async function (req, client, foodlist){
    var final_res = {};
    for (var i = 0; i < req.files.length; i++) {
        const [result] = await client.labelDetection(req.files[i].buffer);
        var label_final = [];
        for (var j = 0; j < result.labelAnnotations.length; j++) {
            const labels = result.labelAnnotations[j].description.toLowerCase();;
            const score = result.labelAnnotations[j].score;
            const temp = { 'description': labels, 'score': score };
            if (labels in foodlist || labels+'s' in foodlist || labels+'es' in foodlist){
                label_final.push(temp);
            }
        }
        final_res[i]=label_final;
    }
    // var return_res = { "result": final_res };
    return (final_res);
}

exports.imageToLabels = imageToLabels;