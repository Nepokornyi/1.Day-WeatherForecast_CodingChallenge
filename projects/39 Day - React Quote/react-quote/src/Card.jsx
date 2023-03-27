import React, {useEffect, useState} from 'react'

function Card({ onNewQuote }) {

    const [quote, setQuote] = useState('');
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        fetch('https://type.fit/api/quotes').then((response) => {
            if(!response){
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('quotes', JSON.stringify(data));
            displayNewQuote();
        })
        .catch((error) => {
            console.log('There was a problem with fetch: ', error);
        })
    }, [])

    const displayNewQuote = () => {
        setOpacity(0);
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem('quotes'));
            setQuote(data[Math.floor(Math.random() * data.length)]);
            setOpacity(1)
        }, 825)
    }

    const generateNewColor = () => {
        onNewQuote();
    }

    const handleNewQuote = () => { displayNewQuote(); generateNewColor(); }

    return (
        <div className='container'>

            <div className='quote' style={{opacity: opacity}}>
                <p>{quote.text}</p>
                <p className='author'>- {quote.author === null ? 'Author Unknown' : quote.author}</p>
            </div>

            <div className='navigation'>
                <div className='socials'>
                    <button><a href="https://twitter.com/">Twitter</a></button>
                    <button><a href="https://www.tumblr.com/">Tumbler</a></button>
                </div>
                <div className='new-quote'>
                    <button onClick={handleNewQuote}>New quote</button>
                </div>
            </div>

        </div>
    )
}

export default Card