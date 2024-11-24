// import { createSelector } from '@reduxjs/toolkit';
// import {useHttp} from '../../hooks/http.hook';
// import { fetchHeroes } from '../../actions';
// import heroes from '../../reducers/heroes';
// import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
// import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
    // const someState = useSelector(state => ({
    //     activeFilter: state.filters.activeFilter,
    //     heroes: state.heroes.heroes
    // }));
    // const filteredHeroesSelector = createSelector(
    //     (state) => state.filters.activeFilter,
    //     (state) => state.heroes.heroes,
    //     (filter, heroes) => {
    //         if (filter === 'all') {
    //             console.log('render');
    //             return heroes;
    //         } else {
    //             return heroes.filter(item => item.element === filter);
    //         }
    //     }
    // );

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all') {
    //         console.log('render');
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
    //     }
    // });
    // const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    // const filteredHeroes = useSelector(filteredHeroesSelector);

    // const onDelete = useCallback((id) => {
    //     // Удаление персонажа по его id
    //     request(`http://localhost:3001/heroes/${id}`, "DELETE")
    //         .then(data => console.log(data, 'Deleted'))
    //         // .then(dispatch(heroDeleted(id)))
    //         .then(dispatch(heroDeleted(id)))
    //         .catch(err => console.log(err));
    //     // eslint-disable-next-line  
    // }, [request]);
    // useEffect(() => {
    //     dispatch(fetchHeroes(/*request*/));
    //     // dispatch(heroesFetching());
    //     // request("http://localhost:3001/heroes")
    //     //     .then(data => dispatch(heroesFetched(data)))
    //     //     .catch(() => dispatch(heroesFetchingError()))

    //     // eslint-disable-next-line
    // }, []);
    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    // const {request} = useHttp();

import { /*useEffect,*/ useCallback, useMemo } from 'react';
import { /*useDispatch,*/ useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.css';

const HeroesList = () => {
    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    const onDelete = useCallback((id) => {
        deleteHero(id);
        // eslint-disable-next-line  
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;