import { useState } from 'react';
import css from './SearchBar.module.css';
import downArrow from '/icons/down-arrow1.png';
import locationIcon from '/icons/location.png';
import searchIcon from '/icons/search.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

let SearchBar = () => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Dummy city data
    const cities = [
        { id: 1, name: 'Mumbai' },
        { id: 2, name: 'Pune' },
        { id: 3, name: 'Amravati' }
    ];

    // Dummy suggestion data with images
    const dummySuggestions = [
        { name: 'KFC', imageUrl: '/images/Food/kfc.png' },
        { name: 'Chicken', imageUrl: '/icons/Food/chicken.png' },
        { name: 'Chilla Hotel', imageUrl: '/images/Food/biryani2.png' }
    ];

    // Handle location selection
    const handleLocationSelect = (e) => {
        setSelectedLocation(e.target.value);
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length >= 1) {
            // Filter suggestions based on query
            const filteredSuggestions = dummySuggestions.filter(suggestion =>
                suggestion.name.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className={css.outerDiv}>
            <div className={css.srch1}>
                <div className={css.iconBox}><img className={css.icon} src={locationIcon} alt="location pointer" /></div>
                <select
                    value={selectedLocation}
                    onChange={handleLocationSelect}
                    className={css.inpt}
                >
                    <option value="">Place..</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
                <div className={css.iconBox}><img className={css.downArrow} src={downArrow} alt="down arrow" /></div>
            </div>
            <hr className={css.hr} />
            <div className={css.srch2}>
                <div className={css.iconBox}><img className={css.icon} src={searchIcon} alt="search icon" /></div>
                <input 
                    type="text" 
                    placeholder='Search for restaurant, cuisine or a dish' 
                    className={css.inpt} 
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                {searchQuery.length >= 1 && (
                    <div className="position-relative mt-2">
                        <div className="card w-100" style={{ zIndex: '100' }}>
                            <div className="card-body">
                                {suggestions.map((suggestion, index) => (
                                    <div key={index} className="d-flex flex-row align-items-center border-bottom pb-2">
                                        <img src={suggestion.imageUrl} className="me-2" alt="Suggestion" style={{ width: '40px', height: '40px' }} /> 
                                        <span className='text-end'>{suggestion.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
