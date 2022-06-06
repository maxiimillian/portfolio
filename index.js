window.addEventListener("load", () => {
    let submitButton = document.querySelector("#submit");

    function validEmail(input) {
        return input.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    }

    function inputIsEmpty(input) {
        return !input.value.trim().length;
    }

    function makeErrorLabel(label, message) {
        console.log(message)
        if (!label.classList.contains("error-label")) { //check is required since it might run again if another element has an error after
            label.classList.add("error-label");
        }
        label.innerHTML = message;
    }

    function getLabel(input) {
        let inputId = input.id;

        let labels = document.querySelectorAll("label");

        for (let i=0; i<labels.length; i++) {
            if (labels[i].htmlFor == inputId) {
                return labels[i];
            }
        }
    }


    document.querySelector("#submit").addEventListener("click", (e) => {
        e.preventDefault();
        let payload = {};
    
        let form = e.target.form;
        let nameInput = form[0];
        let emailInput = form[1];
        let messageInput = form[2];
        let errorOccured = false; //Check for multiple errors before returning

        if (inputIsEmpty(emailInput) || !validEmail(emailInput)) {
            let label = getLabel(emailInput);
            if (label) {
                makeErrorLabel(label, "A valid Email address is required");
            }
            errorOccured = true;
        } else {
            let label = getLabel(emailInput);
            label.innerHTML = "Email";
            label.classList.remove("error-label");
        }

        if (inputIsEmpty(messageInput)) {
            let label = getLabel(messageInput);
            if (label) {
                makeErrorLabel(label, "A message is required");
            }
            errorOccured = true;
        } else {
            let label = getLabel(messageInput);
            label.innerHTML = "Message";
            label.classList.remove("error-label");
        }

        if (errorOccured) {
            submitButton.classList.toggle("error-button");
            setTimeout(() => {
                submitButton.classList.toggle("error-button");
            }, 1000);
            return;
        } else {
            let checkmark = document.createElement("i");
            checkmark.classList.add("fa-solid");
            checkmark.classList.add("fa-check");

            submitButton.classList.add("success-button");
            submitButton.classList.remove("submit");
            submitButton.setAttribute("data-after", "");
            submitButton.innerHTML = "Sent";
            submitButton.appendChild(checkmark);

            submitButton.disabled = true;
        }

        payload["name"] = nameInput.value;
        payload["email"] = emailInput.value;
        payload["message"] = messageInput.value;
        
        console.log(JSON.stringify(payload))
    
        fetch("https://l7khdxeir8.execute-api.us-east-2.amazonaws.com/prod/getemailresource", {
            method: "POST",
            contentType: "application/json",
            crossDomain: "true",
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => console.log(data))
    })

    window.addEventListener("scroll", () => {
        let currentPosition = document.scrollTop;

        let sectiodn = document.querySelector("#projects");
        let navHeight = document.querySelector("nav").clientHeight;

        document.querySelectorAll("nav a").forEach(navItem => {

            let section = document.querySelector(navItem.getAttribute("href"));

            if (section.getBoundingClientRect().top > -40 && section.getBoundingClientRect().top < 210) {
                document.querySelectorAll("nav a").forEach(resetColourItem => {
                    resetColourItem.style.color = "#cacaca";
                });
                navItem.style.color = "white";
            }
        })
    })
});