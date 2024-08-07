import { Component, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types'

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const marvelService = new MarvelService()

    useEffect(() =>{
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }

        onCharLoading()

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)

    }

    const onCharLoading = () => {
        setLoading(true)

    }

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail.includes('image_not_available')) {
        imgStyle = { 'objectFit': 'contain' }
    }

    const arr = []

    for (let i = 0; i < comics.length; i++) {
        if (i > 9) break
        arr.push(
            <li key={i} className="char__comics-item">
                {comics[i].name}
            </li>
        )
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {arr.length !== 0 ? arr : 'There is no comics'}
            </ul>
        </>
    )
}

export default CharInfo;