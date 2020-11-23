import { combineReducers } from 'redux';
import creator from 'common/creator';
// import axios from 'axios';

const GET_COLUMNS = 'GET_COLUMNS';
const UPDATE_COLUMNS = 'UPDATE_COLUMNS';

export const action = {
    get: creator.action.callable(GET_COLUMNS),
    update: creator.action.callable(UPDATE_COLUMNS)
};

export const reducer = combineReducers({
	list: creator.reducer.fromObject({
		[GET_COLUMNS]: (state, action) => {
			return [
                {
                    id: 'startTime',
                    name: 'Start Time',
                    visible: [
                        {
                            id: 1,
                            name: 'Symbol & Description',
                            fixed: true
                        },
                        {
                            id: 2,
                            name: 'Change %',
                            fixed: false
                        },
                        {
                            id: 3,
                            name: 'Change',
                            fixed: false
                        },
                        {
                            id: 4,
                            name: 'Last',
                            fixed: false
                        },
                        {
                            id: 5,
                            name: 'Last Volume',
                            fixed: false
                        },
                        {
                            id: 6,
                            name: 'Bid',
                            fixed: false
                        },
                        {
                            id: 7,
                            name: 'Bid Size',
                            fixed: false
                        },
                        {
                            id: 8,
                            name: 'Ask',
                            fixed: false
                        },
                        {
                            id: 9,
                            name: 'Ask Size',
                            fixed: false
                        },
                        {
                            id: 10,
                            name: 'Total Volume',
                            fixed: false
                        },
                        {
                            id: 11,
                            name: 'High',
                            fixed: false
                        }
                    ]
                },
                {
                    id: 'stopTime',
                    name: 'Stop Time',
                    visible: [
                        {
                            id: 1,
                            name: 'Change %',
                            fixed: false
                        },
                        {
                            id: 2,
                            name: 'Change',
                            fixed: true
                        },
                        {
                            id: 3,
                            name: 'Last Volume',
                            fixed: false
                        },
                        {
                            id: 4,
                            name: 'Bid',
                            fixed: false
                        },
                        {
                            id: 5,
                            name: 'Bid Size',
                            fixed: false
                        }
                    ]
                },
                {
                    id: 'perPoint',
                    name: 'Per Point',
                    visible: []
                },
                {
                    id: 'initialMargin',
                    name: 'Initial Margin',
                    visible: []
                }
            ];
        },
        [UPDATE_COLUMNS]: (state, action) => {
            const newState = state.map(obj => {
                return obj.id === action.payload.id ? {...obj, ...action.payload} : obj;
            })
            return newState;
        }
	}, [])
});

export const middleware = creator.middleware.fromObject({
	// [GET_COLUMNS]: (dispatch, action) => {
    //     const covidTracking = axios.get(`https://api.covidtracking.com/v1/states/current.json`);
    //     const censusData = axios.get('https://api.census.gov/data/2014/pep/natstprc?get=STNAME,POP&DATE_=7&for=state&key=11d0123341b3a2ed57cc1edfebdeddb38add5b7a');
        
    //     Promise.all([covidTracking, censusData]).then(res => {
    //         const covid = res[0].data;
    //         const census = res[1].data;

    //         const data = covid.map(cvd => {
    //             census.find(item => {
    //                 if(item[3] === cvd.fips) {
    //                     cvd.state_name = item[0];
    //                     cvd.population = Number(item[1]);
    //                 }
    //             });
    //             return cvd;
    //          }).filter(state => state.state_name);

    //         dispatch({type: GET_COLUMN_SUCCESS, payload: data})
    //     });
    // }
});
