    
    import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
    // Testing purpose
    // testing part strat

    const today = dayjs();
    // work - 15a.
    const testdate = today.add(1,"M");
    const testdates = testdate.format("MMMM DD");
    console.log("after 5 days ->",testdates);
    
    // 15b.
    const testdate15b = today.add(1,"month");
    const testdates15b = testdate15b.format("MMMM DD");
    console.log("after 1 Months ->",testdates15b);

    // 15c.
    const testd15c = today.add(1,"month");
    const test15c = testd15c.format("MMMM DD");
    console.log("after 1 Months ->",test15c);

    // 15d.
    const testd15d = today;
    const test15d = testd15d.format("dddd");
    console.log("after 1 Months ->",test15d);

    // 15e.
    const testd15e = today.add(5,"days");
    const date = testd15e.format("dddd");

  
    console.log("after 1 Months ->",isWeeKend(date));
    
    // testing part end 

