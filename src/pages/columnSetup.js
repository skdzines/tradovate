import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import { Card } from 'components/card';
import { useSelector, useDispatch } from 'react-redux';
import { action } from 'store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import 'assets/images/hamburger-icon.png';
import 'assets/images/lock-icon.png';
import closeIcon from 'assets/images/close-icon.svg';

const ColumnSetup = () => {

    const dispatch = useDispatch();
    const columnData = useSelector(state => state.columns.list);

    useEffect(() => {
        dispatch(action.columns.get());
    }, []);

    const [visibleColumns, setVisibleColumns] = useState(null);
    const [selectedAvailable, setSelectedAvailable] = useState(null);

    useEffect(() => {
        if(columnData.length && !visibleColumns) {
            setVisibleColumns(columnData[0].visible);
            setSelectedAvailable(columnData[0]);
        }
    }, [columnData]);
    
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = visibleColumns[dragIndex];
        const newOrder = update(visibleColumns, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        });
        setVisibleColumns(newOrder);
        setSelectedAvailable({...selectedAvailable, visible: newOrder});
    }, [visibleColumns]);
    
    const dropped = () => {
        dispatch(action.columns.update({payload: selectedAvailable}));
    }

    const updateAvailableSelection = (selection) => {
        setSelectedAvailable(selection);
        setVisibleColumns(selection.visible);
    }

    const handleItemDoubleClick = (item, index) => {
        const newState = visibleColumns.map((col, i) => {
            return i >= index ? {...col, fixed: !item.fixed} : col;
        });
        setVisibleColumns(newState);
        setSelectedAvailable({...selectedAvailable, visible: newState});
        dispatch(action.columns.update({payload: {...selectedAvailable, visible: newState}}));
    }

	return (

		<section className="column-setup">
            <img className="close" src={closeIcon} />
            <h1>Configure Data Fields
                <span>Drag & between columns to configure visible data.</span>
            </h1>

            <section className="headings columns">
                    <h2>Available</h2>
                    <h2>Visible</h2>
            </section>
            
            <section className="columns">
                <DndProvider backend={HTML5Backend}>
                    <div className="available">
                        <ul>
                            {
                                columnData.map(column => <li key={column.id} onClick={updateAvailableSelection.bind(null, column)}>{column.name}</li>)
                            }
                        </ul>
                    </div>
                    <div className="visible">
                        {
                            visibleColumns && visibleColumns.length ? 
                                <ul>
                                {
                                    visibleColumns.map((visibleItem, index) => <Card key={visibleItem.name} index={index} id={visibleItem.id} text={visibleItem.name} fixed={visibleItem.fixed} moveCard={moveCard} dropped={dropped} doubleClick={handleItemDoubleClick.bind(null, visibleItem, index)}/>)
                                }
                                </ul>
                            : <p>No items available.</p>
                        }
                    </div>
                </DndProvider>
            </section>
            <section className="ctas">
                <button>Save</button>
                <button className="secondary">Cancel</button>
            </section>
		</section>
	);
}

export default ColumnSetup;