# SQL Normalization of Information System

## The table is shown below  

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

### Question 1: What columns violate 1NF?

- Column `dinner_date`, does not violate 1NF, however, it is a good practice to use consistent date formatting incase we want operations like sorting by date.  
- Column `food_code` and `food_description` violate 1NF because they contain values that are not atomic like `C1, C2` and `Curry `Cake` in one cell respectively.

### Question 2: What entities do you recognize that could be extracted?

- Entities like, **dinners**, **members**, **foods** and **venues**

### Question 3: Name all the tables and columns that would make a 3NF complaint solution.

### These are the tables that would make the above table normalized to 3NF
- **members** columns (`member_id` **PK**, `member_name`, `member_address`)
- **dinners** columns (`dinner_id` **PK**, `dinner_date`, )
- **member_dinners** columns (`member_id` **FK**, `dinner_id` **FK**) 
- **venues**  columns (`venue_id`  **PK**, `venue_code`, `venue_description` )
- **dinner_venues** columns (`venue_id` **FK**, `dinner_id` **FK**)
- **foods**   columns (`food_id`   **PK**, `food_code`, `food_description`)
- **dinner_foods** column(`dinner_id` **FK**, `food_id` **FK**)
 

