import Link from 'next/link';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';

import { useState } from 'react';

import styles from './countriesTable.module.css';

function orderBy(countries, value, direction) {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
}

function SortArrow({ direction }) {
  if (!direction) {
    return <></>;
  }

  if (direction == 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
}

export default function CountriesTable({ countries }) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  function switchDirection() {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  }

  function setValuesAndDirection(value) {
    switchDirection();
    setValue(value);
  }

  return (
    <>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValuesAndDirection('name')}
        >
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValuesAndDirection('population')}
        >
          <div>Population</div>

          {value === 'population' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValuesAndDirection('area')}
        >
          <div>
            Area (km<sup style={{ fontSize: '.7rem' }}>2</sup>)
          </div>

          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValuesAndDirection('gini')}
        >
          <div>Gini</div>

          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </>
  );
}
