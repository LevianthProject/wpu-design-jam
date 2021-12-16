const baseUrl = "https://designjam.bellshade.org/api";

$(document).ready(async function () {
  $("#quota").ready(function () {
    $.ajax({
      url: baseUrl + "/count",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data.remaining);
        $("#quota").text(`Kuota peserta sisa ${data.remaining}`);

        if (data.remaining == 0) {
          $("#text-daftar").text("MOHON MAAF KUOTA PESERTA SUDAH HABIS");
          $("#btn-daftar").addClass("hidden");
        }
      },
    });
  });

  $("#register").submit(async function (event) {
    event.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let username = $("#username").val();

    body = { name, email, username };
    console.log(body);

    try {
      const response = await fetch(baseUrl + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(response);
      const resBody = await response.json();

      if (response.status == 200) {
        const quota = await getQuota();
        $("#quota").text(`Kuota peserta sisa ${quota.remaining}`);
        $("#btn-submit").addClass("modal-close");
        modalClose();
      } else {
        $("#error-msg").text(resBody.message);
        $("#error-msg").removeClass("hidden");
      }
    } catch (error) {
      console.log(error);
    }
  });
});

async function getQuota() {
  try {
    const res = await fetch(baseUrl + "/count", {
      method: "GET",
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
