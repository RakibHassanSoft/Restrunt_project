import React, { useMemo } from 'react';

function MyComponent({ a, b }) {
  const result = useMemo(() => {
    // expensive calculation
    return a + b;
  }, [a, b]);

  return (
    <div>
      The result is {result}
    </div>
  );
}

export default MyComponent;






// import React, { useState, useMemo } from 'react';

// const items = [
//   'apple',
//   'banana',
//   'orange',
//   'grape',
//   'watermelon',
//   'pineapple',
//   'mango'
// ];

// function Home() {
//   const [query, setQuery] = useState('');

//   // Memoize the filtered items based on the query
//   const filteredItems = useMemo(() => {
//     console.log('Filtering items...');
//     return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
//   }, [query]);

//   return (
//     <div className='mt-96'>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search..."
//       />
//       <ul>
//         {filteredItems.map(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;
