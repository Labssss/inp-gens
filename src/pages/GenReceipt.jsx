import React, {useContext, useState} from 'react';
import { Iframe } from '../components/iframe';
import {CustomContext} from "../Context";




export function GenReceipt() {
    const [valueDate, setValueDate] = useState(new Date())
    const [valuePrice, setValuePrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [iframeUrl, setIframeUrl] = useState('')
    const [imgName, setImgName] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()

        const check = {
            card: `${getNumber(4)} ${getNumber(4)}`,
            price: `-${valuePrice}`,
            date: formatDateToScreen(valueDate),
            saldo: `${getRandomInt(1,1000)},${getRandomInt(0,10)}${getRandomInt(1,10)} PLN`,
            date_waluty: formatDateToScreen(valueDate),
            number_ref: `05272423213283${getNumber(9)}`,
            price_2: `${valuePrice} PLN`,
            pln_step: valuePrice.toString().length - 1
        }

        const obj = {
            "files": [ 
                "https://raw.githubusercontent.com/Labssss/icg/main/pko%20check%20release.psd"
            ],
            "resources": [
                "https://raw.githubusercontent.com/Labssss/icg/main/Dax-Pro-Regular.ttf",
            ],
            "environment": {
        
            },
            "script" : `var a = app.activeDocument.layers.getByName('card'); a.textItem.contents = '${check.card}';
            a = app.activeDocument.layers.getByName('summa_1'); a.textItem.contents = '${check.price}';
            a = app.activeDocument.layers.getByName('data_operacji'); a.textItem.contents = '${check.date}';
            a = app.activeDocument.layers.getByName('saldo'); a.textItem.contents = '${check.saldo}';
            a = app.activeDocument.layers.getByName('data_waluty'); a.textItem.contents = '${check.date_waluty}';
            a = app.activeDocument.layers.getByName('numer_ref'); a.textItem.contents = '${check.number_ref}';
            a = app.activeDocument.layers.getByName('summa_2'); a.textItem.contents = '${check.price_2}';
            a = app.activeDocument.layers.getByName('PLN'); a.translate(${11 * check.pln_step},0);
            app.activeDocument.saveToOE("png");`
        }
        setIframeUrl(encodeURI(`https://www.photopea.com#${JSON.stringify(obj)}`))
        setImgName(check.price)
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

    function getNumber(n) {
        let number = '';
        for(let i = 0; i < n; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    function formatDateToScreen(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('.');
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const changeHandler = (event) => {
        let input = event.target.id
        switch (input) {
            case "InputPrice":
                setValuePrice(event.target.value)
                break;
            
            case "InputDate":
                setValueDate(new Date(event.target.value))
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
                <div>
                    <label htmlFor="price" className="form-label inline-block text-gray-700">
                        Price
                    </label>
                    <div className="relative w-1/2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">zł</span>
                        </div>
                        <input
                            type="number"
                            name="price"
                            id="InputPrice"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                            placeholder="0"
                            value={(valuePrice)}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="mt-1 w-1/2">
                    <label htmlFor="InputDate" className="form-label inline-block text-gray-700">Date</label>
                    <input 
                        type="date"
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                        id="InputDate"
                        value={formatDate(valueDate)}
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
                    Ready receipt
                </label>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-1 py-1 h-px-689 w-px-385"id="doneImg">
                    <img className="mx-auto mx-px-689 w-px-385 text-gray-300" aria-hidden="true" src={imgUrl}/>
                </div>
            </div>
        </form>
        </>
    );
};