import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      { id: 11, artist: 'Paul Simon', title: 'You can call me Al' },
      { id: 12, artist: 'Dolly Parton', title: 'Jolene' },
      { id: 13, artist: 'Michael Jackson', title: 'Ben' },
      { id: 14, artist: 'Hans de Booij', title: 'Annabel' },
      { id: 15, artist: 'Beatles', title: 'Lucy in the sky with diamonds' },
      { id: 16, artist: 'Rolling Stones', title: 'Angie' },
      { id: 17, artist: 'Vanessa Paradis', title: 'Joe le taxi' },
      { id: 18, artist: 'Bob Dylan', title: 'Diamond Joe' },
      { id: 19, artist: 'Bruce Springsteen', title: 'Linda let me be the one' },
      { id: 20, artist: 'Neil Diamond', title: 'Sweet Caroline' },
      {
        "@id": 1,
        "id": 12065,
        "artist": "Todd Rundgren",
        "title": "Piss Aaron",
        "background": null,
        "youtube": null
      },
      {
        "@id": 2,
        "id": 12066,
        "artist": "Céline Dion",
        "title": "La Mémoire d'Abraham",
        "background": null,
        "youtube": null
      },
      {
        "@id": 3,
        "id": 12067,
        "artist": "Aerosmith",
        "title": "Adam's apple",
        "background": null,
        "youtube": null
      },
      {
        "@id": 4,
        "id": 12068,
        "artist": "Blink 182",
        "title": "Adam's song",
        "background": null,
        "youtube": null
      },
      {
        "@id": 5,
        "id": 12069,
        "artist": "Khaled",
        "title": "Aicha",
        "background": null,
        "youtube": null
      },
      {
        "@id": 6,
        "id": 12071,
        "artist": "Eric Clapton",
        "title": "Alberta",
        "background": null,
        "youtube": null
      },
      {
        "@id": 7,
        "id": 12072,
        "artist": "Bob Dylan",
        "title": "Alberta #1",
        "background": null,
        "youtube": null
      },
      {
        "@id": 8,
        "id": 12073,
        "artist": "Bob Dylan",
        "title": "Alberta #2",
        "background": null,
        "youtube": null
      },
      {
        "@id": 9,
        "id": 12074,
        "artist": "Harry Sacksioni",
        "title": "Ali's Shuffle",
        "background": null,
        "youtube": null
      },
      {
        "@id": 10,
        "id": 12075,
        "artist": "Peter Koelewijn",
        "title": "Alice",
        "background": null,
        "youtube": null
      },
      {
        "@id": 11,
        "id": 12076,
        "artist": "Smokie",
        "title": "Living next door to Alice",
        "background": null,
        "youtube": null
      },
      {
        "@id": 12,
        "id": 12077,
        "artist": "Gompie",
        "title": "Alice, who the x is Alice?",
        "background": null,
        "youtube": null
      },
      {
        "@id": 13,
        "id": 12078,
        "artist": "The Move",
        "title": "When Alice comes back to the farm",
        "background": null,
        "youtube": null
      },
      {
        "@id": 14,
        "id": 12079,
        "artist": "Normaal",
        "title": "Alie",
        "background": null,
        "youtube": null
      },
      {
        "@id": 15,
        "id": 12080,
        "artist": "Elvis Costello",
        "title": "Alison",
        "background": null,
        "youtube": null
      },
      {
        "@id": 16,
        "id": 12081,
        "artist": "Falco",
        "title": "Amadeus",
        "background": null,
        "youtube": null
      },
      {
        "@id": 17,
        "id": 12082,
        "artist": "Boston",
        "title": "Amanda",
        "background": null,
        "youtube": null
      },
      {
        "@id": 18,
        "id": 12083,
        "artist": "Don Williams",
        "title": "Amanda",
        "background": null,
        "youtube": null
      },
      {
        "@id": 19,
        "id": 12084,
        "artist": "Richard Marx",
        "title": "Angelia",
        "background": null,
        "youtube": null
      },
      {
        "@id": 20,
        "id": 12085,
        "artist": "Bob Dylan",
        "title": "Angelina",
        "background": null,
        "youtube": null
      },
      {
        "@id": 21,
        "id": 12086,
        "artist": "Bob Dylan",
        "title": "Farewell Angelina",
        "background": null,
        "youtube": null
      },
      {
        "@id": 22,
        "id": 12087,
        "artist": "Faithless",
        "title": "Angeline",
        "background": null,
        "youtube": null
      },
      {
        "@id": 23,
        "id": 12088,
        "artist": "Peter Koelewijn",
        "title": "Angeline",
        "background": null,
        "youtube": null
      },
      {
        "@id": 24,
        "id": 12089,
        "artist": "BZN",
        "title": "Angelique",
        "background": null,
        "youtube": null
      },
      {
        "@id": 25,
        "id": 12090,
        "artist": "André van Duin",
        "title": "Angelique",
        "background": null,
        "youtube": null
      },
      {
        "@id": 26,
        "id": 12091,
        "artist": "Rolling Stones",
        "title": "Angie",
        "background": null,
        "youtube": null
      },
      {
        "@id": 27,
        "id": 12092,
        "artist": "Gorki",
        "title": "Anja",
        "background": null,
        "youtube": null
      },
      {
        "@id": 28,
        "id": 12093,
        "artist": "Dave Berry",
        "title": "Ann",
        "background": null,
        "youtube": null
      },
      {
        "@id": 29,
        "id": 12094,
        "artist": "Alexander Curly",
        "title": "Lady Anna belle",
        "background": null,
        "youtube": null
      },
      {
        "@id": 30,
        "id": 12095,
        "artist": "Hans de Booij",
        "title": "Annabel",
        "background": null,
        "youtube": null
      }
    ];
    return { songs };
  }
}