let X = document.getElementById("press");

$(document).ready(function () {
  var max_fields = 10;
  var wrapper = $(".container1");
  var add_button = $(".add_form_field");

  var x = 1;
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append(
        '<div><input type="text" name="mytext[]" value="" class="border-2 my-1"/><a href="#" class="delete text-white ml-2 press">Delete</a></div>'
      ); //add input box
    } else {
      alert("You Reached the limits");
    }
  });

  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent("div").remove();
    x--;
  });
});

X.addEventListener("click", () => {
  const inputs = document.getElementsByTagName("input");
  Array.from(inputs)
    .map((item) => item.value)
    .filter((value) => value !== "")
    .forEach((number) => {
      document.getElementById("container").style.display = "none";
      document.getElementById("loading").innerHTML =
        '<img id="loadingimg" src="/Media/load.gif" alt="Loading Image">';
      document.getElementById("loading").style.display = "flex";
      setTimeout(() => {
        const XHR = new XMLHttpRequest();
        let url =
          "https://kelpom-imei-checker1.p.rapidapi.com/api?imei=" + number;
        XHR.open("GET", url);
        XHR.setRequestHeader(
          "x-rapidapi-host",
          "kelpom-imei-checker1.p.rapidapi.com"
        );
        XHR.setRequestHeader(
          "x-rapidapi-key",
          "aa14e9021emshec6160dde6d5ff8p149571jsn688f13038174"
        );
        XHR.responseType = "json";
        XHR.onload = () => {
          let Result = XHR.response;
          if (!Result.valid) {
            document.getElementById("result1").style.display = "flex";
            document.getElementById("loading").style.display = "none";
            document.getElementById("container").style.display = "flex";
            alert("no record found");
          } else {
            console.log(Result);
            let IMEi = "IMEI Number is : " + Result.imei;
            let BRAND = "Mobile Brand is : " + Result.model.brand;
            let Device = "Device Brand is : " + Result.model.device;
            let Model_Number = "Model Number is : " + Result.model.model_nb;
            console.log(IMEi, BRAND, Device, Model_Number);

            // Printing Result on Page
            document.getElementById("result1").style.display = "flex";
            document.getElementById("loading").style.display = "none";
            document.getElementById("container").style.display = "flex";
            createTable({ IMEi, BRAND, Device, Model_Number });
          }
        };
        XHR.send();
      }, 4000);
    });

  function createTable(params) {
    // Create paragraphs for each value
    const IMEi = document.createElement("p");
    IMEi.innerHTML = params.IMEi;

    const BRAND = document.createElement("p");
    BRAND.innerHTML = params.BRAND;

    const Device = document.createElement("p");
    Device.innerHTML = params.Device;

    const Model_Number = document.createElement("p");
    Model_Number.innerHTML = params.Model_Number;

    // Create a new div element to hold the paragraphs
    const resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "result");
    resultDiv.setAttribute("class", "text-white");
    resultDiv.style = "display:flex";

    // Append the paragraphs to the "result" div with line breaks
    resultDiv.appendChild(IMEi);
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(BRAND);
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(Device);
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(Model_Number);

    // Get the "result1" div element
    const fullResult = document.getElementById("result1");

    // Append the "resultDiv" to the "fullResult"
    fullResult.appendChild(resultDiv);
  }
});

document.getElementById("logo").addEventListener("click", () => {
  let ImEi = "Privious Searched IMEI : " + localStorage.getItem("IMEI");
  document.getElementById("privious").innerText = ImEi;
  document.getElementById("privious").style.display = "block";
});

// Editable Command
document.body.contentEditable = true;
