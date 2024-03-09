import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import he from "he";

const getBrowser = async () => {
  console.log("Launching new browser instance");
  return puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
};

const genPdf = async (content) => {
  console.log("Starting export pdf");
  const browser = await getBrowser();
  const page = await browser.newPage();
  content = he.decode(content);
  await page.setContent(content);
  const pdf = await page.pdf({
    format: "a4",
    margin: {
      left: 20,
      top: 20,
      right: 20,
      bottom: 40,
    },
    displayHeaderFooter: true,
  });

  await browser.close();
  return pdf;
};

export const lambdaHandler = async (event) => {
  try {
    const body = JSON.parse(String(event.body));
    const { content } = body;
    const pdf = await genPdf(content);
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
      body: pdf.toString("base64"),
      isBase64Encoded: true,
    };
    return response;
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    };
  }
};
