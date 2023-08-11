import React, {useContext, useState} from 'react';
import { Iframe } from '../components/iframe';
import {CustomContext} from "../Context";




export function GenScreen() {
    const [valueName, setValueName] = useState('')
    const [valueAdres, setValueAdres] = useState(`${localStorage.getItem('adres') || ''}`)
    const [imgUrl, setImgUrl] = useState('')
    const [iframeUrl, setIframeUrl] = useState('')
    const [imgName, setImgName] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        localStorage.setItem('adres', valueAdres);

        const obj = {
            "files": [ 
                "https://raw.githubusercontent.com/Labssss/psd/main/release 2.psd"
            ],
            "environment": {
        
            },
            "script" : `var a = app.activeDocument.layers.getByName('Name'); a.textItem.contents = '${valueName}'; a = app.activeDocument.layers.getByName('Adres'); a.textItem.contents = '${valueAdres}';app.activeDocument.saveToOE("png");`
        }
        setIframeUrl(encodeURI(`https://www.photopea.com#${JSON.stringify(obj)}`))
        setImgName(`${valueName}_${valueAdres}`)
    }

    const messageHandler = (e) => {
        if (e.data.__proto__.toString() === '[object ArrayBuffer]') {
            var arrayBufferView = new Uint8Array(e.data);
            var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
            var urlCreator = window.URL || window.webkitURL;
            setImgUrl(urlCreator.createObjectURL(blob));
            console.log(e) 
        }
    }

    const changeHandler = (event) => {
        let input = event.target.id
        switch (input) {
            case "InputName":
                setValueName(event.target.value)
                break;
            
            case "InputAdres":
                setValueAdres(event.target.value)
                break;

            default:
                break;
        }
    }
    window.addEventListener("message", messageHandler);
    return (
        <>
        <Iframe iframeUrl={iframeUrl} key={iframeUrl}/>
        <form>
            <div className='mt-6 ml-4 grid grid-cols-1 gap-x-6 gap-y-2'>
                <div className="w-1/2">
                    <label htmlFor="InputName" className="form-label inline-block text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="InputName"
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                        placeholder="Ivan "
                        value={valueName}
                        onChange={changeHandler}
                    />
                </div>
                <div className="mt-1 w-1/2">
                    <label htmlFor="InputAdres" className="form-label inline-block text-gray-700">Adres</label>
                    <input 
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                        id="InputAdres"
                        placeholder="Warszawa, Polska"
                        value={valueAdres}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className="mt-6 ml-4 flex items-center justify-start gap-x-6">
                <button type="button" onClick={submitHandler} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate</button>
                <a href={imgUrl} download={imgName}>
                    <button type="button" className={`rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${ !imgUrl && 'hidden'}`}>
                        Download
                    </button>
                </a>
            </div>
            <div className="col-span-full mt-6 ml-4 grid-cols-1">
                <label htmlFor="cover-photo" className="form-label inline-block text-gray-700">
                    Ready screen
                </label>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-1 py-1 h-px-689 w-px-385"id="doneImg">
                    <img className="mx-auto mx-px-689 w-px-385 text-gray-300" aria-hidden="true" src={imgUrl}/>
                </div>
            </div>
        </form>
        </>
    );
};