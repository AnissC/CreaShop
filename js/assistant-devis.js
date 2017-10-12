$(document).ready(function () {
    firstQuestion = $(".questionnaire .question").eq(0);

    $(".questionnaire .coordonnees input[type=text].required").keyup(function () {
        if (isValid($(this).closest(".coordonnees"))) {
            $(".actions #suivant").removeClass("disabled");
        }
        else {
            $(".actions #suivant").addClass("disabled");
        }
    });

    $(".questionnaire .question input[type=text].required").keyup(function () {
        if (isValid($(this).closest(".question"))) {
            $(".actions #suivant").removeClass("disabled");
        }
        else {
            $(".actions #suivant").addClass("disabled");
        }
    });

    $(".questionnaire input[type=text].required").focus(function () {
        $(this).removeClass("warning");

    });

    $(".actions #suivant").click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        var currentQuestion = $(".questionnaire .visible");

        if (!$(this).hasClass("disabled")) // si les données sont valides
        {
            if (!currentQuestion.hasClass("coordonnees")) {

                if (currentQuestion.is("#typeSite")) {
                    if (currentQuestion.find("button#ecommerce").hasClass("selected"))
                        currentQuestion.next().removeClass("exclude");
                    else
                        currentQuestion.next().addClass("exclude");
                }

                if (currentQuestion.is("#siteExistant")) {
                    if (currentQuestion.find("input[type=text]").val() == "")
                        currentQuestion.next().removeClass("exclude");
                    else
                        currentQuestion.next().addClass("exclude");
                }

                var questionToDisplay = currentQuestion.nextAll().not(".exclude").first();

                currentQuestion.removeClass("visible animated bounceInRight bounceInLeft shake");
                questionToDisplay.addClass("visible animated bounceInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () { // on animation end
                    questionToDisplay.removeClass("animated bounceInRight bounceInLeft shake");
                });

                if (firstQuestion.hasClass("visible"))
                    $(".actions #precedent").hide();
                else
                    $(".actions #precedent").show();

                if (isValid(questionToDisplay))
                    $(".actions #suivant").removeClass("disabled");
                else
                    $(".actions #suivant").addClass("disabled");
            }
            else {
                //traitement final
                sendDemandeDevisWebmy()
            }

        }
        else {
            getEmptyFields(currentQuestion.find("input[type=text].required")).addClass("warning");
            currentQuestion.addClass("shake animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { // on animation end
                currentQuestion.removeClass("shake animated bounceInRight bounceInLeft");
            });
        }
    });

    $(".actions #precedent").click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        var currentQuestion = $(".questionnaire .visible");
        var questionToDisplay = currentQuestion.prevAll().not(".exclude").first();

        currentQuestion.removeClass("visible animated bounceInRight bounceInLeft shake");
        questionToDisplay.addClass("visible animated bounceInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () { // on animation end
            questionToDisplay.removeClass("animated bounceInRight bounceInLeft shake");
        });

        if (firstQuestion.hasClass("visible")) // si on est à la première question, bouton précédent invisible
            $(".actions #precedent").hide();
        else
            $(".actions #precedent").show();

        if (isValid(questionToDisplay))
            $(".actions #suivant").removeClass("disabled");
        else
            $(".actions #suivant").addClass("disabled");
    });

    $(".question button.radio").click(function () {
        $(this).closest(".question").find("button").removeClass("selected");
        $(this).addClass("selected");

        if (isValid($(this).closest(".question")))
            $(".actions button#suivant").removeClass("disabled");
    });

    $(".question button.reset").click(function () { // bouton qui lorsque sélectionné, entraine la déselection de tous les autres
        $(this).closest(".question").find("button").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".question button.checkbox").click(function () {
        if ($(".question button.reset.selected").length > 0)
            $(".question button.reset.selected").removeClass("selected");

        if (!$(this).hasClass("selected"))
            $(this).addClass("selected");
        else
            $(this).removeClass("selected");

        if (isValid($(this).closest(".question")))
            $(".actions #suivant").removeClass("disabled");
    });
});

function isValid(question) {
    var valid = false;

    if (question.find("input[type=text]").length > 0) // si au moins 1 input texte
    {
        if (question.find("input[type=text].required").length > 0) // si au moins 1 input texte obligatoire (qui ne peut pas être vide)
        {
            if (getEmptyFields(question.find("input[type=text].required")).length == 0) // si aucun input texte obligatoire n'est vide
            {
                valid = true;
            }
        }
        else { // si seulement des input texte non obligatoires
            valid = true;
        }
    }
    else if (question.find("textarea").length > 0) { // cas textarea
        valid = true
    }
    else { // cas de bouton radio ou checkbox
        if (question.find("button.selected").length > 0) {
            valid = true;
        }
    }
    return valid;
}

function getEmptyFields(inputs) { // retourne le nombre de champs vides
    return inputs.filter(function () {
        return !$(this).val().trim();
    });
}

function getAnswers() {
    var t = "<h2>Coordonnées</h2>";
    t += "<ul>";
    $(".coordonnees input").each(function () {
        t += "<li><span style='font-weight: bold;'>" + $(this).attr('placeholder') + " : </span>" + ($(this).val().trim() == "" ? "Non renseigné" : $(this).val()) + "</li>";
    });
    t += "</ul>";

    t += "<h2>Questions</h2>";
    t += "<ul>";
    $(".question").each(function () {
        if (!$(this).hasClass("exclude")) {
            var titre = $(this).find("h2").text();
            t += "<li>";
            t += "<span style='font-weight: bold;'>" + titre + "</span><br />";
            if ($(this).find("input").length > 0 || $(this).find("textarea").length > 0) { // question input ou textarea
                t += "<span>" + ($(this).find("input, textarea").val().trim() == "" ? "Non renseigné" : $(this).find("input, textarea").val()) + "</span><br />";
            }
            else if ($(this).find("button.radio").length > 0) { // question button radio
                t += "<span>" + $(this).find(".selected").text() + "</span><br />";
            }
            else { // question checkbox
                $(this).find("button.checkbox.selected").each(function () {
                    t += "<span>" + $(this).text() + "</span><br />";
                });
            }
            t += "</li>";
        }
    });
    t += "</ul>";

    return t;
}

function sendDemandeDevisWebmy() {

    var parameters = JSON.stringify({
        'data': getAnswers()
    });

    jQuery.ajax({
        type: "POST",
        url: "/WebService.asmx/SendDemandeDevisWebmy",
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (msg) {
            $(".actions #suivant").hide();
            $(".actions #precedent").hide();
            $(".visible").removeClass("visible animated bounceInRight bounceInLeft shake");
            $(".message-validation").addClass("visible animated zoomInUp");

        },
        error: function (msg) {
            alert('fail' + msg.d);
        }

    });
}