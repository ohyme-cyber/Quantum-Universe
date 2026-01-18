---
tags:
  - Designed-M
  - Randomized-M
  - Non-Linear-Value
title: Randomized M for Non-linear Value
date: 2026-01-18
---
1. 本文目标：
![[Pasted image 20260118233812.png]]
2. 传统Randomized Measurement：$\mathrm{Tr}(\rho^2)$

对 $\rho$ 施加一个 $U\sim Haar$, 如果是纯态，其在随机基底下的概率分布会涨落大；反之如果是 $\rho\sim I$, 概率分布涨落会很小，因此可以利用其二阶矩来估算纯度。
$$\mathbb{E}_U \left[ \sum_s P_U(s)^2 \right] = \frac{2}{d+1} \text{Tr}(\rho^2) + \frac{1}{d+1} (\text{Tr}\rho)^2.$$

3. 对于可观测量 $O$,