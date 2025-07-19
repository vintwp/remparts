'use client';

import { useEffect, useState } from 'react';

import { Place, getShippingCities, getShippingWarehouses } from '@/entities/shipping';

import { SelectPlace } from './SelectPlace';

type Props = {
  city?: Place;
  warehouse?: Place;
  onChangeCity?: (v: Place) => void;
  onChangeWarehouse?: (v: Place) => void;
};

export function SelectShipping({ city, warehouse, onChangeCity, onChangeWarehouse }: Props) {
  const [cities, setCities] = useState<Place[]>([]);
  const [warehouses, setWarehouses] = useState<Place[]>([]);
  const [searchingCity, setSearchingCity] = useState<string>('');
  const [searchingWarehouse, setSearchingWarehouse] = useState<string>('');

  const handleSearchCityName = (v: string) => {
    setSearchingCity(v);
  };

  const handleSearchWarehouse = (v: string) => {
    setSearchingWarehouse(v);
  };

  const handleSelectCity = (v: Place) => {
    if (onChangeCity) {
      onChangeCity(v);
      setSearchingCity('');
    }
  };

  const handleSelectWarehouse = (v: Place) => {
    if (onChangeWarehouse) {
      onChangeWarehouse(v);
      setSearchingWarehouse('');
    }
  };

  useEffect(() => {
    async function fetchCities(cityName: string, selectedCityFromUserData?: Place) {
      const citiesFromServer = await getShippingCities(cityName);

      if (citiesFromServer.ok) {
        if (selectedCityFromUserData) {
          const isCityExistInDefaultList = citiesFromServer.data.some(
            city => city.id === selectedCityFromUserData.id,
          );

          if (isCityExistInDefaultList) {
            setCities(citiesFromServer.data);
            return;
          }

          setCities([selectedCityFromUserData, ...citiesFromServer.data]);
          return;
        }

        setCities(citiesFromServer.data);
      } else {
        setCities([]);
      }
    }

    fetchCities(searchingCity, city);
  }, [searchingCity, city]);

  useEffect(() => {
    async function fetchWarehouses(cityForWarehouses: Place, warehouseName: string) {
      try {
        const warehousesFromServer = await getShippingWarehouses(
          cityForWarehouses.id,
          warehouseName,
        );

        if (warehousesFromServer.ok) {
          setWarehouses(warehousesFromServer.data);
        }
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }

    if (city) {
      fetchWarehouses(city, searchingWarehouse);
    }
  }, [city, searchingWarehouse]);

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Дані для доставки</p>
      <div className="flex flex-wrap gap-4">
        <SelectPlace
          places={cities}
          selectedPlace={city}
          onChangePlaceName={handleSearchCityName}
          onSelectPlace={handleSelectCity}
          className="flex-1"
          placeholder="Знайти місто/село"
          placeholderNotFound="Місто/село не знайдено"
        />
        <SelectPlace
          places={warehouses}
          selectedPlace={warehouse}
          onChangePlaceName={handleSearchWarehouse}
          onSelectPlace={handleSelectWarehouse}
          className="flex-1"
          placeholder="Знайти відділення/поштомат"
          placeholderNotFound="Відділення/поштомат не знайдено"
          disabled={!city}
        />
      </div>
    </div>
  );
}
