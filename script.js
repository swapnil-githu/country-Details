 //will return array of objects

 async function getData()
 {
     let endpoint="https://restcountries.com/v2/all/";
     try
     {
         let response=await fetch(endpoint);
         if(response.status===200)
         {
             return response.json();
         }
         else
         {
             throw new Error(response.status);
         }
     }
     catch(error)
     {
         throw error;
     }
 }
 
 $("document").ready(async ()=>{
     let data=document.getElementsByClassName("data");
     let sel=document.querySelector("select");
     sel.innerHTML="<option>Select Country</option>";
     try
     {
         let ans=await getData();
         ans.forEach(element => {
             sel.innerHTML+=`<option>${element["name"]}</option>`;
         });
         sel.onclick=()=>{
             let index=sel.selectedIndex;
             let cindex=index-1;
              if (cindex!==-1)
             {
                 let newset=ans[cindex];

                 let cname=newset["name"];
                 let cap=newset["capital"];
                 let tiz=newset["timezones"][0];
                 let flag=newset["flags"]["png"];
                 let region=newset["region"];
                 let pop=newset["population"];
                 let subreg=newset["subregion"];
                 let callcode=newset["callingCodes"];
                 let cur=newset["currencies"].filter(c => c.name).map(c => `${c.name} (${c.code})`);


                 $("#data").html(`<strong>Country Name : ${cname}</storng>
                 <br><br><img src=${flag}>
                 <br><br><strong>Capital : ${cap}</strong>
                 <br><br><strong>Region : ${region}</strong>
                 <br><br><strong>Time Zone : ${tiz}</strong>
                 <br><br><strong>Population : ${pop}</strong>
                 <br><br><strong>Subregion: ${subreg}</strong>
                 <br><br><strong>callingCodes: ${callcode}</strong>
                 <br><br><strong>currencies: ${cur}</strong>`);
             }
             else
             {
                 $("#data").html("");
             }
         };
     }
     catch(error)
     {
         alert(error);
     }
 });