import { TextInputWithSearch } from 'react-component-library-sutradhar'
/* Props Example: 
  border: "standard" | "outlined" | "filled";
  width: '100px' '50%';
  fontSize: '14px';
  fontColor: '#000000'
  listData: [
    {
      id: 1,
      firstName: Jon,
      lastName: Doe
    },
    {
      id: 1,
      firstName: Jon,
      lastName: Doe
    },
    ....
  ]
  // searchBy will be the same value you will enter in textfield as input
  searchBy: firstName
  handleReturnValue: callbackfunction
*/

function Sutracomp() {


    const testData=[
        {
          id: "1",
          firstName: "Jon",
          lastName: "Doe"
        },
        {
          id: "2",
          firstName: "Jon2",
          lastName: "Doe2"
        },
    
      ]


function handleSelectedValues(event){

console.log("x===>",event)

}

  return <TextInputWithSearch
          fontFamily='Arial'
          label='Test Label'
          fontSize='14px'
          fontColor='#000000'
          listData={testData}
          placeholder='Enter text'
          multipleSelection={false}
          searchBy='id'
          width='200px'
          handleReturnValue={handleSelectedValues}
        />
}

export default  Sutracomp