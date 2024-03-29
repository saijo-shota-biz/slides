// =======================================================
// 定数
// =======================================================
/** 1年あたりの月数 */
const MONTHS_PER_YEAR = 12 // ヶ月
/** リスク資産の年利回り (%) */
const RISK_ASSET_ANNUAL_INTEREST_RATE = 9.52
/** 無リスク資産の年利回り (%) */
const NO_RISK_ASSET_ANNUAL_INTEREST_RATE = 0.5
// =======================================================

// =======================================================
// 変数
// =======================================================
/** 投資期間 (年) */
const INVESTMENT_PERIOD = 30
/** 手取り月収 (円) */
const MONTHLY_INCOME = 400000
/** 先取り貯金の割合 (%) */
const SAVINGS_RATE = 20
/** 毎月の貯蓄額 */
const MONTHLY_SAVINGS = Math.floor(MONTHLY_INCOME * (SAVINGS_RATE / 100))
// const MONTHLY_SAVINGS = 100000
/** 月の生活費 (円) */
const MONTHLY_LIVING_COST = 350000
/** リスク許容度 (全世界株式インデックスファンドの比率 %) */
const RISK_TOLERANCE = 100 // %
/** 貯蓄用口座が生活費の何ヶ月分を超えたら投資に回すか (ヶ月) */
const SAVINGS_MONTHS = 6 // ヶ月
/** 現在の年齢 (歳) */
const CURRENT_AGE = 30 // 歳
// =======================================================

// =======================================================
// 計算処理
// =======================================================
/** 貯蓄用の口座 */ 
let savingsAccount = 0
/** リスク資産の投資額 */
let riskAssetInvestment = 0
/** 無リスク資産の投資額 */
let noRiskAssetInvestment = 0

for (let i = 0; i < INVESTMENT_PERIOD * MONTHS_PER_YEAR; i++) {
    // 毎月の処理
    // 貯蓄用の口座にあるお金が生活費の6ヶ月分を超えていない場合
    if (savingsAccount < MONTHLY_LIVING_COST * SAVINGS_MONTHS) {
        // 貯蓄用の口座にお金を追加
        savingsAccount += MONTHLY_SAVINGS
    } else {
        // 投資用の口座にお金を追加
        riskAssetInvestment += Math.floor(MONTHLY_SAVINGS * (RISK_TOLERANCE / 100))
        noRiskAssetInvestment += Math.floor(MONTHLY_SAVINGS * ((100 - RISK_TOLERANCE) / 100))
    }

    // 1年ごとの処理
    if (i % MONTHS_PER_YEAR === 11) {
        // 資産の年利回り分を増やす
        riskAssetInvestment += Math.floor(riskAssetInvestment * (RISK_ASSET_ANNUAL_INTEREST_RATE / 100))
        noRiskAssetInvestment += Math.floor(noRiskAssetInvestment * (NO_RISK_ASSET_ANNUAL_INTEREST_RATE / 100))
    }

    // 5年ごとに年度の終わりごとにログを出力
    if (i % MONTHS_PER_YEAR === 11 && Math.floor(i / MONTHS_PER_YEAR) % 5 === 4) {
        const age = CURRENT_AGE + Math.floor(i / MONTHS_PER_YEAR) + 1
        const totalAssets = savingsAccount + riskAssetInvestment + noRiskAssetInvestment
        const totalSavings = (i + 1) * MONTHLY_SAVINGS
        console.log(`\n` +
            `${Math.floor(i / MONTHS_PER_YEAR) + 1}年目の資産状況:\n` +
            `貯蓄用の口座: ${savingsAccount.toLocaleString()}円\n` +
            `全世界株式インデックスファンドの投資額: ${riskAssetInvestment.toLocaleString()}円\n` +
            `個人向け国債の投資額: ${noRiskAssetInvestment.toLocaleString()}円\n` +
            `${age}歳の時の資産合計: ${totalAssets.toLocaleString()}円(貯金だけの場合${totalSavings.toLocaleString()}円)`
        );
    }
}