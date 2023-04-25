import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.loadChars()
    }

    onCharsLoaded = (chars) => {
        this.setState({
            chars
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    loadChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }


    render = () => {
        const { chars, loading, error } = this.state
        const elements = chars.map(char => {
            return (
                <CharItem
                    key={char.id}
                    char={char}
                    onClick={this.props.onCharSelected}
                />
            )
        })
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {elements}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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