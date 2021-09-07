export function importAllDirImages(r: any) {
    let images: any = {};
    r.keys().map((item: any, idx: number) => { images[item.replace('./', '')] = r(item); });
    return images;
}

// export function fetchCharacterImgByIdx(idx: number) {
//     let images = Object.keys(importAllDirImages(require.context('../assets/images/characters', false, /\.(png|jpe?g|svg)$/)));
//     let retImg = "";
//     if (images[idx])
//         retImg = images[idx];
//     else
//         retImg = Math.abs(idx - 0) < Math.abs(idx - images.length - 1) ? images[images.length - 1] : images[0];

//     return retImg;
// }