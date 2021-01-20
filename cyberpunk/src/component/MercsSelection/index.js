import { useState } from "react";
import PropTypes from "prop-types";
import { getMercByIdAsync } from "../../service/merc";
import { message } from "../../service/notification";

const MercsSelection = ({ onSelectMerc, mercSelected, mercs, isDisabled, className }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleSelectMerc = (idMerc) => {
        setDropdownVisible(!isDropdownVisible);
        getMercByIdAsync(idMerc)
            .then(merc => onSelectMerc(merc))
            .catch(e => message().error(e));
    }

    return (
        <div className={className}>
            <label id="listbox-label" className="block text-sm font-medium text-gray-300">Mercenaries</label>
            <div className="mt-1 relative">
                <button type="button"
                        disabled={isDisabled}
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                        className={`${!isDisabled ? "bg-white cursor-pointer" : "bg-gray-200" }relative flex items-center w-full h-10 border border-gray-300 rounded-md shadow-sm pl-3 pr-2 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}>
                        <span className={`ml-3 block truncate ${!!mercSelected ? 'text-black' : 'text-gray-400'}`}>
                            {!!mercSelected ? mercSelected.nickname : "Please select a merc"}
                        </span>
                        <i className={`ml-auto fas ${isDropdownVisible ? "fa-chevron-up" : "fa-chevron-down" } text-gray-400`}/>
                </button>

                <div className={`absolute mt-1 w-full rounded-md bg-white z-10 shadow-lg ${!isDropdownVisible ? "hidden" : "" }`}>
                    <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {
                            mercs.map((merc, i) => (
                                <li key={i}
                                    onClick={() => handleSelectMerc(merc.id)}
                                    className="text-gray-900 hover:text-white hover:bg-gray-800 cursor-pointer select-none relative py-2 pl-3 pr-9">
                                    <div className="flex items-center">
                                        {merc.nickname}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

MercsSelection.defaultProps = {
    mercSelected: {},
    isDisabled: false,
    className: ""
}

MercsSelection.propTypes = {
    onSelectMerc: PropTypes.func.isRequired,
    mercSelected: PropTypes.object,
    mercs: PropTypes.array.isRequired,
    isDisabled: PropTypes.bool,
    className: PropTypes.string
}

export default MercsSelection;
