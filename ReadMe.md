This is the my first simple project using the D3.js library.

D3 Notes

1. The standard formatting of numbers by D3 is to put a thousands
delimiter (a comma), since I wanted the numbers in the xAxis to 
represent years, I formatted the numbers using .tickFormat(d3.format("d"))
on the xAxis. The complete line of code is:
const xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format("d"))

2. While the previous version (3) of D3.js allowed calling the attr() method
with an object containing the attributes and their values, this option
has been removed from the standard D3 library. Now the same result can be
achieved with the method attrs() and calling:
<script src="https://d3js.org/d3-selection-multi.v1.min.js"></script>
Of course this has as a result one more call to the server.

JavaScript Notes

To avoid using JQuery just to make a simple JSON request I used the fetch API.

CSS

I used flexbox to center my svg inside the page.

General 

If I initiallize npm after I have created my github repo, the github links 
will populate automatically the package.json file.

Links

Fetch
1. https://hashnode.com/post/5-best-libraries-for-making-ajax-calls-in-react-cis8x5f7k0jl7th53z68s41k1
2. https://davidwalsh.name/fetch
3. https://developer.mozilla.org/en/docs/Web/API/Fetch_API
4. https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en
5. https://fetch.spec.whatwg.org/

