import './charList.scss';
import { Component, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'

const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        //onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError)
    }

    const onCharsLoaded = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }

        setChars(chars => [...chars, ...newChars])
        setLoading(false)
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const elements = chars.map(char => {
        return (
            <CharItem
                key={char.id}
                char={char}
                onClick={props.onCharSelected}
            />
        )
    })
    return (
        <div className="char__list">
            <ul className="char__grid">
                {elements}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const CharItem = ({ char, onClick }) => {
    const { id, name, thumbnail } = char
    let objectFit = "cover"

    if (thumbnail.includes("image_not_available")) {
        objectFit = 'contain'
    }

    return (
        <li key={id} className="char__item"
            onClick={() => onClick(id)}>
            <img src={thumbnail} alt="abyss" style={{ objectFit: objectFit }} />
            <div className="char__name">{name}</div>
        </li>
    )
}



export default CharList;