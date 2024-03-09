import fetch from "node-fetch";


async function image2text(imageUrl) {
    const response = await fetch(imageUrl);
    const imageData = await response.arrayBuffer();

    const fetchResponse = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: imageData,
        }
    );
    const result = await fetchResponse.json();
    return result;

}


image2text('https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.theacornwithin.com%2Fblog%2F2017%2F5%2F16%2Ffights1%2F2mykidsareinthemiddleofone&psig=AOvVaw36spEScCFStrf4wvo6KC8F&ust=1710090339311000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi0s4vV54QDFQAAAAAdAAAAABAE').then(console.log)