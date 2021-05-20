<script>
	// import Day from './Day.svelte';
    // const timesToBeRendered = 7;
    import { DateTime } from 'luxon';

    export let docRef, data, dateTime, weekIndex, dayIndex;
    // console.log(data, dateTime, weekIndex, dayIndex);

    function renderDateTimeCompleted() {
      const blah = data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted;
      console.log("blah", blah);
      if (blah) {
        // return new DateTime(blah).toLocaleString(DateTime.TIME_24_SIMPLE)

        // return blah;
        return DateTime.fromISO(blah).toLocaleString(DateTime.TIME_24_SIMPLE)
      } else {
        return '';
      }
    }

    function onClick() {
        // alert('Day onClick()')

        // docRef.set({
        //     [data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()]]: true
        // });

          // console.log(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()]);

// console.log(dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate().startDate);
// console.log(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()]);
const blah = dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate();
console.log(blah);
          const newObject = Object.assign({}, data )
          newObject.days[blah].isCompleted = true;
          newObject.days[blah].dateTimeCompleted = DateTime.now().toISO();
console.log(newObject);
          docRef.set(newObject);
        // docRef
        //     .collection( data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()] )
        //     .set({ isCompleted: true });

  //       docRef
  //           .collection( data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()] )
  //           .set({ isCompleted: true });
	}
</script>

<section on:click={onClick}>
    <!-- { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate() }  -->
    { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).day }
<!-- {dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()} -->
<br/>
<br/>
    {data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}
    <br/>
    {renderDateTimeCompleted()}
</section>

<style>
    section {
        display: inline-block;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        
        /* width: 50px;
        height: 50px;
        border-radius: 100px; */

        width: 80px;
        height: 80px;

        cursor: pointer;

        padding: 10px 0;
    }

    section:hover {
        background-color: grey;
    }


</style>