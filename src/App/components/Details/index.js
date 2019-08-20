import React from 'react';

class Details extends React.Component {
    /**
     * Get the grammatically correct age text.
     */
    getText = () => {
        const { age } = this.props;

        const type = age.toString().startsWith('8') || age === 18 ? 'an' : 'a';

        return `I'm ${type} ${age} year-old, web-based software developer.`;
    }

    /**
     * Render this class.
     */
    render () {
        return (
            <div className="details-container">
                <h1 className="white header">Salem Cresswell</h1>

                <p className="white secondary">{this.getText()}</p>
                <p className="white secondary">On a day-to-day basis, I'll mainly program in Javascript, HTML & PHP.</p>
            </div>
        )
    }
}

export default Details;
