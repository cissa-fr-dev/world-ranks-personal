import SearchInput from '../components/SearchInput/searchInput';
import Layout from '../components/Layout/layout';
import styles from '../styles/home.module.css';
import CountriesTable from '../components/CountriesTable/countriesTable';
import { useState } from 'react';

export default function Home({ countries }) {
  const [keyword, setKeyWord] = useState('');

  function filteredCountries() {
    const newCountries = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword) ||
        country.subregion.toLowerCase().includes(keyword)
    );
    return newCountries;
  }

  function onInputChange(e) {
    e.preventDefault();

    setKeyWord(e.target.value.toLowerCase());
  }

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}> Found {countries.length} countries</div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubReagion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries()} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
}
