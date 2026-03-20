import { useTimeDisplay } from "@/utils";

const time = useTimeDisplay('2025-12-31', 'DD天HH小时mm分ss秒', {mode:'countdown'});
while (true) {
    console.log(time.value);
    await new Promise(resolve => setTimeout(resolve, 1000));
}
